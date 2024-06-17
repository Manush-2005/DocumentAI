"use client";
import React from 'react'

type Props = { pdf_url: string}

const Pdfviwer = ({pdf_url}: Props) => {
  return (
    <iframe src={pdf_url} className='w-full h-full'>


    </iframe>
  )
}

export default Pdfviwer;