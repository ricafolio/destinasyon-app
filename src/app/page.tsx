"use client";

import { useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import Input from "./components/Input"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const [fetching, setFetching] = useState(false)

  async function generatePlaces() {
    if (!fetching) {
      const toastStatus = toast.loading('Fetching places...')
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

      setResult(data.result.choices[0].message.content)
      toast.success('Success!', { id: toastStatus })
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
      <h1 className="font-bold text-5xl">Tell us about your next trip 🏝️</h1>
      <div className="w-full py-8">
        <Input
          prompt={prompt}
          fetching={fetching}
          onRandomBtnClick={generateRandomPrompt}
          onSubmitBtnClick={generatePlaces}
          onPromptValueChange={handlePromptValueChange}
        />
      </div>
      {result === "" && <p className="block w-full p-4 text-lg text-gray-300 bg-transparent rounded border-2 border-dashed border-gray-600">
        <b>Tip:</b> The more specific you are about your preferences, the more tailored our recommendations will be to your interests and travel style. ✨
      </p>}
    </main>
  )
}
