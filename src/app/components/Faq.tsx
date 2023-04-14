export default function FAQ({ question, answer }: { question: string, answer: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-bold mb-1">{question}</h2>
      <p className="text-zinc-300"><span className="text-zinc-500">-</span> {answer}</p>
    </div>
  )
}