import FAQ from "../components/Faq"
import { erode } from "../fonts"

export default function Help() {
  const faqs = [
    {
      question: "What is the app about?",
      answer: "This app is a travel destination discovery platform that utilizes AI to help users find the best travel destinations in the Philippines based on their specified interests.",
    },
    {
      question: "What is \"Destinasyon\"?",
      answer: "The word \"Destinasyon\" is a Filipino term that translates to \"destination\" in English. It refers to a place that someone intends to visit or reach, particularly in the context of travel.",
    },
    {
      question: "Which technologies were used to develop the app?",
      answer: "Next.js, Tailwind CSS, OpenAI & Google Places API",
    },
    {
      question: "How is user data handled in your app?",
      answer: "We do not store any user data on our servers, with the exception of the saved destinations which are stored locally in the user's browser. This means that only the user who saved the destinations can access and view them.",
    },
    {
      question: "Can I provide feedback or report issues?",
      answer: "Sure! I am always looking for ways to improve the app and make it more useful.",
    },
    {
      question: "How can I contact you?",
      answer: "Please contact me in Discord - <Jyu/>#4209",
    }
  ]

  return (
    <main className="flex flex-col items-center text-left text-white p-4 sm:p-12 md:p-24 pt-12 sm:pt-24">
      <h1 className={`font-bold text-2xl sm:text-3xl mb-8 block text-left ${erode.className}`}>Help</h1>
      <div className="w-full sm:w-3/6 mx-auto">
        {faqs.map((faq, i) => {
          return <FAQ key={`faq-${i}`} question={faq.question} answer={faq.answer} />
        })}
      </div>
    </main>
  )
}
