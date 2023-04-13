"use client";

import { useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import { Destination as DestinationType } from "./types"

import Input from "./components/Input"
import Destination from "./components/Destination"
import Help from "./components/Help"

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

      if (!response.ok) {
        toast.error(data.message, { id: toastStatus })
        setFetching(false)
        return
      }

      // prays
      const content = eval("(" + data.result.choices[0].message.content + ")")

      if (content.success) {
        setResult(content.data)
        toast.success('Enjoy these results! ✨', { id: toastStatus })
      } else {
        toast.error('Sorry, please try again with different prompt.', { id: toastStatus })
      }

      setFetching(false)
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

      if (!response.ok) {
        toast.error(data.message, { id: toastStatus })
        setFetching(false)
        return
      }

      setPrompt(data.result.choices[0].message.content)
      toast.success('Random prompt generated!', { id: toastStatus })
      setFetching(false)
    }
  }

  function handlePromptValueChange(value: string, clear: boolean) {
    setPrompt(value)
    if(clear) toast.success('Cleared')
  }

  return (
    <main className="flex min-h-screen flex-col items-center text-center p-4 sm:p-24 pt-12 sm:pt-36 m-3 rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 text-white relative">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 32,
        }}
      />

      <div className="absolute top-0 right-0 p-5">
        <a href="https://ricafolio.me" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-200 transition-colors">Built by Ricafolio.me</a>
      </div>

      <div className="absolute top-3 left-3">
        <Help />
      </div>

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
