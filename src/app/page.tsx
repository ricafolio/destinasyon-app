"use client"

import { useState, useRef } from "react"
import { Toaster, toast } from "react-hot-toast"

import { Destination as DestinationType, Spot } from "./types"
import { PromptValueChangeArgs } from "./types/props"
import { useSpotStore } from "./store"

import Input from "./components/Input"
import Destination from "./components/Destination"

export default function Home() {
  const resultsRef = useRef<HTMLIFrameElement>(null)
  const [prompt, setPrompt] = useState<string>("")
  const [result, setResult] = useState<DestinationType[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const addSpot = useSpotStore(state => state.addSpot)

  async function generateDestinations() {
    if (!prompt) {
      toast.error("Please add a prompt!")
      return
    }

    if (!isFetching) {
      const toastStatus = toast.loading(`Finding best destinations for you...
This might take a while.`)
      setIsFetching(true)

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
      const data = await response.json()

      // error handling
      let error_msg = null

      if (!response.ok) {
        error_msg = data.message
      }

      if (data.result["error"]) {
        if (data.result["error"].type === "requests") {
          error_msg = "Rate limit reached! Please try again in a minute."
        } else {
          error_msg = "Unknown error has occurred! Please try again."
        }
      }

      if (error_msg) {
        toast.error(error_msg, { id: toastStatus })
        setIsFetching(false)
        return
      }

      // prays
      const content = eval("(" + data.result.choices[0].message.content + ")")

      if (content.success) {
        toast.success("Enjoy these results! ✨", { id: toastStatus })
        setResult(content.data)
        // scroll down
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      } else {
        toast.error("Sorry, please try again with different prompt.", { id: toastStatus })
      }

      setIsFetching(false)
      return
    }
  }

  async function generateRandomPrompt() {
    if (!isFetching) {
      const toastStatus = toast.loading("Generating random prompt...")
      setIsFetching(true)

      const response = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "random"
        })
      })
      const data = await response.json()

      // error handling
      let error_msg = null

      if (!response.ok) {
        error_msg = data.message
      }

      if (data.result["error"]) {
        if (data.result["error"].type === "requests") {
          error_msg = "Rate limit reached! Please try again in a minute."
        } else {
          error_msg = "Unknown error has occurred! Please try again."
        }
      }

      if (error_msg) {
        toast.error(error_msg, { id: toastStatus })
        setIsFetching(false)
        return
      }

      // success
      toast.success("Random prompt generated!", { id: toastStatus })
      setPrompt(data.result.choices[0].message.content)
      setIsFetching(false)
      return
    }
  }

  function handlePromptValueChange({ newValue, isClear }: PromptValueChangeArgs) {
    setPrompt(newValue)
    if (isClear) toast.success("Cleared")
  }

  function handleSaveBtnClick({ name, description, imageUrl, mapsUrl, uid, vicinity, rating, totalRatings }: Spot) {
    addSpot(
      {
        name,
        description,
        imageUrl,
        mapsUrl,
        uid,
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
          isFetching={isFetching} 
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

      <div ref={resultsRef} className="w-full rounded-xl mt-4 scroll-mt-4">
        {result.length > 0 && (
          <h2 className="font-bold text-3xl sm:text-4xl mt-16 mb-8">Check out these destinations!</h2>
        )}

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
