import { getModel } from "../config/llmModels.js";

export const router =async(params)=>{
    const llm = await getModel("router")
    const prompt = `you are an agent router.

    Available agents are: 
    -chat, -search, -coding,-pdf,-ppt,-vision
    
    Rules:

    chat:
    General Conversation, Q&A, and casual interactions.

    search:
    Current events, news, trending topics,recent developments,internet lookup,current events
    
    coding:
    Generate Code,debugging,Code explanations,Code optimization,Code refactoring,Code review,Code snippets,Code documentation,Code testing,Code analysis,Code generation from specifications,Code translation between languages,build projects,architecture,API design

    pdf:
    questions about pdf documents, extract information from pdfs, summarize pdf content, analyze pdf data, convert pdf to other formats, manipulate pdf files, search within pdfs, annotate pdfs, merge or split pdfs, optimize pdfs for web or print
    
    ppt:
    questions about ppt documents, extract information from ppts, summarize ppt content, analyze ppt data, convert ppt to other formats, manipulate ppt files, search within ppts, annotate ppts, merge or split ppts, optimize ppts for web or print

    visio:
    generate image,create visual content, image recognition, image analysis, image classification, image enhancement, image manipulation, image generation, image segmentation, object detection in images, facial recognition in images, image captioning, image style transfer, image restoration, image super-resolution
    
    return  ONLY one word:
    chat
    search
    coding
    pdf
    ppt
    vision
    
    
    user Query:
    ${state.prompt}
    `
const response=await llm.invoke(prompt)
console.log(response)
return {
    ...state,
    agent:response.content.trim().toLowerCase()
}

}