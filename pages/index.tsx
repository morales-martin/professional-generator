import Head from "next/head";
import { Inter } from "@next/font/google";
// import styles from "@/styles/Home.module.css";
import { NextPage } from "next";
import { useState } from "react";
import LoadingDots from "../components/LoadingDots";
import ResizeablePanel from "../components/ResizeablePanel";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [promptInput, setPromptInput] = useState("");
  const [generatedPrompts, setGeneratedPrompts] = useState<String>("");

  const prompt = `Generate 2 professional statements clearly labeled "1." and "2.". Make sure each generated statement is at max 255 characters and base it on this context: ${promptInput}${
    promptInput.slice(-1) === "." ? "" : "."
  }`;

  const generatePrompt = async (e: any) => {
    e.preventDefault();
    setGeneratedPrompts("");
    setLoading(true);

    console.log(prompt);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedPrompts((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-red">
      <Head>
        <title>Professional Generator</title>
      </Head>
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
          Generate a professional prompt in seconds
        </h1>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            {/* <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            /> */}
            <p className="text-left font-medium">
              {"Write a phrase you'd like to convert professionally."}
            </p>
          </div>
          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "e.g. I'm busy now. You're too loud. I don't want to attend."
            }
          />

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generatePrompt(e)}
            >
              Generate your prompts &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <ResizeablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedPrompts && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Your generated prompts
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    {generatedPrompts
                      .substring(generatedPrompts.indexOf("1") + 3)
                      .split("2.")
                      .map((generatedPrompt) => {
                        return (
                          <div
                            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedPrompt);
                              toast("Prompt copied to clipboard", {
                                icon: "✂️",
                              });
                            }}
                            key={generatedPrompt}
                          >
                            <p>{generatedPrompt}</p>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizeablePanel>
      </main>
    </div>
  );
};

export default Home;
