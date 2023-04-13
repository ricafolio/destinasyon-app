"use client";

import { useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import Input from "./components/Input"
import Destination from "./components/Destination"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState([])
  const [fetching, setFetching] = useState(false)

  async function generatePlaces() {
    if (!fetching) {
      const toastStatus = toast.loading('Fetching places... It could take a while.')
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
    <main className="flex min-h-screen flex-col items-center text-center p-4 sm:p-24 pt-12 sm:pt-36 m-3 rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-800 text-white">
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 32,
        }}
      />
      <h1 className="font-bold text-4xl sm:text-5xl mt-8 sm:mt-0">Tell us about your next trip 🏝️</h1>
      <div className="w-full py-8">
        <Input
          prompt={prompt}
          fetching={fetching}
          onRandomBtnClick={generateRandomPrompt}
          onSubmitBtnClick={generatePlaces}
          onPromptValueChange={handlePromptValueChange}
        />
      </div>
      <p className="block w-full p-4 text-lg text-gray-300 bg-transparent rounded border-2 border-dashed border-gray-600">
        <b>Tip:</b> The more specific you are about your preferences, the more tailored our recommendations will be to your interests and travel style. ✨
      </p>
      <div className="w-full py-8 bg-zinc-900 rounded-xl mt-4 px-4">
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
