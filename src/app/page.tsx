"use client"

import { useState, useRef } from "react"
import { Toaster, toast } from "react-hot-toast"

import { Destination as DestinationType, Spot } from "./types"
import { PromptValueChangeArgs, FetchStatus } from "./types/props"
import { useSpotStore } from "./store"

import Input from "./components/Input"
import Destination from "./components/Destination"

export default function Home() {
  const resultsRef = useRef<HTMLIFrameElement>(null)
  const [prompt, setPrompt] = useState<string>("")
  const [result, setResult] = useState<DestinationType[]>([])
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>({
    isLoading: false,
    source: null
  })
  const addSpot = useSpotStore(state => state.addSpot)

  async function generateDestinations() {
    if (!prompt) {
      toast.error("Please add a prompt!")
      return
    }

    if (fetchStatus.isLoading) {
      return
    }

    const toastStatus = toast.loading(`Finding best destinations for you... \n This might take a while.`)
    
    setFetchStatus({
      isLoading: true,
      source: "submit"
    })

    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        action: "submit",
        prompt: prompt
        })
      })

      if (!response.ok) {
        throw new Error("An error occurred while submitting the request. Please try again later.")
      }

      const data = await response.json()

      if (data.result["error"]) {
        if (data.result["error"].type === "requests") {
        throw new Error("Rate limit reached! Please try again in a minute.")
        } else {
        throw new Error("An unknown error has occurred! Please try again later.")
        }
      }

      let content = null
      try {
        content = eval("(" + data.result.choices[0].message.content + ")")
      } catch {
        throw new Error("Sorry, please try again with different prompt!")
      }

      if (content && content.success) {
        setResult(content.data)
        toast.success("Enjoy these results! ✨", { id: toastStatus })
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      } else {
        throw new Error("Sorry, please try again with different prompt!")
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      toast.error(message, { id: toastStatus })
    }

    setFetchStatus({
      isLoading: false,
      source: null
    })

    return
  }

  async function generateRandomPrompt() {
    if (fetchStatus.isLoading) {
      return
    }

    const toastStatus = toast.loading("Generating random prompt...")

    setFetchStatus({
      isLoading: true,
      source: "random"
    })

    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "random"
        })
      })

      if (!response.ok) {
        throw new Error("An error occurred while submitting the request. Please try again later.")
      }

      const data = await response.json()

      if (data.result["error"]) {
        if (data.result["error"].type === "requests") {
          throw new Error("Rate limit reached! Please try again in a minute.")
        } else {
          throw new Error("Unknown error has occurred! Please try again later.")
        }
      }

      setPrompt(data.result.choices[0].message.content)
      toast.success("Random prompt generated!", { id: toastStatus })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      toast.error(message, { id: toastStatus })
    }

    setFetchStatus({
      isLoading: false,
      source: null
    })

    return
  }

  function handlePromptValueChange({ newValue, isClear }: PromptValueChangeArgs) {
    setPrompt(newValue)
    if (isClear) toast.success("Cleared")
  }

  function handleSaveBtnClick({ id, name, description, imageUrl, mapsUrl, vicinity, rating, totalRatings }: Spot) {
    addSpot(
      {
        id,
        name,
        description,
        imageUrl,
        mapsUrl,
        vicinity,
        rating,
        totalRatings,
      }
    )
    toast.success(`${name} saved.`)
  }

  return (
    <main className="flex flex-col items-center text-center text-white p-4 sm:p-12 md:p-24 pt-12 sm:pt-24">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 28
        }}
      />

      <h1 className="font-bold text-4xl sm:text-5xl">Tell us about your dream trip 🏝️</h1>

      <div className="w-full pt-6 pb-3">
        <Input 
          prompt={prompt} 
          fetchStatus={fetchStatus} 
          onRandomBtnClick={generateRandomPrompt} 
          onSubmitBtnClick={generateDestinations} 
          onPromptValueChange={handlePromptValueChange} 
        />
      </div>

      {result.length === 0 && (
        <p className="block w-full py-4 px-4 sm:px-6 text-base sm:text-lg text-zinc-300 bg-transparent rounded border-[1.5px] border-dashed border-zinc-700">
          <b>Tip:</b> The more specific you are about your preferences, the more tailored our recommendations will be. ✨
        </p>
      )}

      <div ref={resultsRef} className="w-full rounded-xl mt-12 scroll-mt-4">
        {result?.map((destination, i) => {
          return (
            <Destination 
              name={destination.name}
              description={destination.description}
              spots={destination.spots}
              index={i}
              key={`destination-${i}`}
              onSaveBtnClick={handleSaveBtnClick}
            />
          )
        })}
      </div>
    </main>
  )
}
