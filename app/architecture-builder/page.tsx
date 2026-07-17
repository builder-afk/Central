"use client"

import React, { useState } from "react"
import { useCompletion } from "@ai-sdk/react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Sparkles, Loader2, Save, Users, Server, Box, LayoutTemplate } from "lucide-react"

export default function ArchitectureBuilderPage() {
  const [productInfo, setProductInfo] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [loadingState, setLoadingState] = useState("")

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/architect",
    onFinish: () => {
      setIsGenerating(false)
      setLoadingState("")
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!productInfo.trim()) return

    setIsGenerating(true)
    
    // Simulate the worker progress for UX (since we're running Promise.all on the backend, 
    // it will take 10-20 seconds before the stream actually starts).
    const loadingStates = [
      "Delegating to Backend Expert...",
      "Delegating to Database Expert...",
      "Analyzing AI Infrastructure requirements...",
      "Designing Zero-Cost DevOps pipeline...",
      "Securing the architecture...",
      "Estimating horizontal scaling limits...",
      "Lead Architect is merging the final master plan..."
    ]
    
    let stateIndex = 0
    setLoadingState(loadingStates[0])
    
    const interval = setInterval(() => {
      stateIndex++
      if (stateIndex < loadingStates.length) {
        setLoadingState(loadingStates[stateIndex])
      } else {
        clearInterval(interval)
      }
    }, 3000)

    try {
      await complete(productInfo)
    } finally {
      clearInterval(interval)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 pb-20 font-sans">
      <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-500" />
            <span className="font-bold tracking-tight text-lg">Multi-Agent Planner</span>
          </div>
          <div className="text-xs font-medium px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Zero-Cost AI Architecture Mode
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Form Column */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
              <LayoutTemplate className="w-5 h-5 text-emerald-500" />
              Product Input
            </h2>
            <p className="text-neutral-400 text-sm mb-4">
              Paste your filled-out Product Template here. Our specialized AI agents will analyze it concurrently.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <textarea
                value={productInfo}
                onChange={(e) => setProductInfo(e.target.value)}
                placeholder="Paste product details..."
                className="w-full h-[400px] bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none text-neutral-200"
                disabled={isLoading || isGenerating}
              />
              <button
                type="submit"
                disabled={isLoading || isGenerating || !productInfo.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating || isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Users className="w-5 h-5" />
                )}
                {isGenerating || isLoading ? "Architecting System..." : "Dispatch AI Experts"}
              </button>
            </form>
          </div>
        </div>

        {/* Output Document Column */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl min-h-[600px] flex flex-col overflow-hidden relative">
            
            {/* Header / Loading State */}
            <div className="border-b border-neutral-800 p-4 bg-neutral-900/50 flex items-center justify-between z-10">
              <h3 className="font-semibold flex items-center gap-2">
                <Box className="w-4 h-4 text-emerald-500" />
                Engineering Blueprint
              </h3>
              
              {!isGenerating && !isLoading && completion && (
                <button 
                  onClick={() => window.print()}
                  className="text-xs flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors"
                >
                  <Save className="w-3.5 h-3.5" /> Export PDF
                </button>
              )}
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto relative">
              
              {isGenerating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/80 backdrop-blur-sm z-20">
                  <div className="relative mb-6">
                    <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                    <Users className="w-4 h-4 text-emerald-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight text-white">Multi-Agent Assembly</h3>
                  <p className="text-emerald-400 font-mono text-sm animate-pulse">{loadingState}</p>
                </div>
              )}

              {completion ? (
                <div className="prose prose-invert prose-emerald max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {completion}
                  </ReactMarkdown>
                </div>
              ) : !isGenerating && (
                <div className="h-full flex flex-col items-center justify-center text-neutral-500 opacity-60">
                  <Server className="w-16 h-16 mb-4 opacity-50" />
                  <p>Awaiting product input to generate architecture.</p>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>
    </div>
  )
}
