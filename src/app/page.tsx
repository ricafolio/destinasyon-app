"use client";

import { useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import { Destination as DestinationType } from "./types"

import Input from "./components/Input"
import Destination from "./components/Destination"

export default function Home() {
  const [prompt, setPrompt] = useState<string>("")
  const [result, setResult] = useState<DestinationType[]>([])
  const [fetching, setFetching] = useState<boolean>(false)

  async function generateDestinations() {
    if (!fetching) {
      const toastStatus = toast.loading('Finding best destinations... It could take a while.')
      setFetching(true)

      const response = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "submit",
          prompt: prompt
        }),
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
        setFetching(false)
        return
      }

      // prays
      const content = eval("(" + data.result.choices[0].message.content + ")")

      if (content.success) {
        toast.success('Enjoy these results! ✨', { id: toastStatus })
        setResult(content.data)
      } else {
        toast.error('Sorry, please try again with different prompt.', { id: toastStatus })
      }

      setFetching(false)
      return
    }
  }

  async function generateRandomPrompt() {
    if (!fetching) {
      const toastStatus = toast.loading('Generating random prompt...')
      setFetching(true)

      const response = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "random"
        }),
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
        setFetching(false)
        return
      }

      // success
      toast.success('Random prompt generated!', { id: toastStatus })
      setPrompt(data.result.choices[0].message.content)
      setFetching(false)
      return
    }
  }

  function handlePromptValueChange(value: string, clear: boolean) {
    setPrompt(value)
    if(clear) toast.success('Cleared')
  }

  return (
    <main className="flex flex-col items-center text-center text-white p-4 sm:p-12 md:p-24 pt-12 sm:pt-24">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 32,
        }}
      />

      <h1 className="font-bold text-4xl sm:text-5xl mt-14 sm:mt-0">Tell us about your next dream trip 🏝️</h1>

      <div className="w-full py-8">
        <Input
          prompt={prompt}
          fetching={fetching}
          onRandomBtnClick={generateRandomPrompt}
          onSubmitBtnClick={generateDestinations}
          onPromptValueChange={handlePromptValueChange}
        />
      </div>

      {(result.length === 0) && <p className="block w-full p-4 text-lg text-gray-300 bg-transparent rounded border-2 border-dashed border-gray-600">
        <b>Tip:</b> The more specific you are about your preferences, the more tailored our recommendations will be to your interests and travel style. ✨
      </p>}

      <div className="w-full rounded-xl mt-4">
        {result.length > 0 && <h2 className="font-bold text-3xl sm:text-4xl mt-8 mb-8">Check out these destinations!</h2>}
        {result?.map((destination, i) => {
          return (
            <Destination
              name={destination.name}
              description={destination.description}
              coordinates={destination.coordinates}
              places={destination.places}
              index={i}
              key={`destination-${i}`}
            />
          )
        })}
      </div>
    </main>
  )
}
