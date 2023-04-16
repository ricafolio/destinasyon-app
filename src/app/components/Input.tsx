import { InputProps } from "../types/props"
import RandomIcon from "./icons/RandomIcon"

export default function Input({ prompt, isFetching, onRandomBtnClick, onSubmitBtnClick, onPromptValueChange }: InputProps) {
  return (
    <div className="flex flex-col w-full">
      <textarea
        name="prompt"
        placeholder="I wanna go to a place that offers the best island hopping experience in Mindanao"
        className="
          w-full text-lg sm:text-2xl px-4 py-3 rounded-lg
          transition-colors duration-150
          border-2 border-black text-black bg-[#e8e6e4]
          selection:bg-black/10 focus:bg-gray-50 focus:border-amber-500 focus:outline-none
        "
        rows={4}
        value={prompt}
        onChange={(e) => onPromptValueChange({ newValue: e.target.value, isClear: false })}
        autoFocus={true}
      ></textarea>

      <div className="flex flex-col sm:flex-row sm:justify-between w-full mt-2">
        <div className="flex flex-row items-center">
          <button
            className="w-1/2 flex items-center justify-center text-center rounded-lg px-8 py-2 bg-white text-black h-full transition-colors duration-150 hover:bg-slate-100 active:bg-slate-200 focus:bg-slate-50 disabled:cursor-wait"
            onClick={onRandomBtnClick}
            disabled={isFetching}
          >
            <span className="rotate-45">
              <RandomIcon />
            </span>
            <span className="text-lg sm:text-xl ml-2">Random</span>
          </button>
          <button
            className="w-1/2 bg-white text-black text-lg sm:text-xl rounded-lg px-8 py-2 transition-colors duration-150 hover:bg-slate-100 active:bg-slate-200 focus:bg-slate-50 h-full ml-2"
            onClick={() => onPromptValueChange({ newValue: "", isClear: true })}
          >
            Clear
          </button>
        </div>

        <button
          className="rounded-lg px-8 py-2 mt-2 sm:ml-2 sm:mt-0 text-lg sm:text-xl h-full transition-colors duration-150 focus:outline-6  disabled:cursor-wait focus:outline-amber-500 bg-amber-400 text-black hover:bg-amber-500 active:bg-amber-400 focus:bg-amber-500"
          onClick={onSubmitBtnClick}
          disabled={isFetching}
        >
          Get destinations
        </button>
      </div>
    </div>
  )
}