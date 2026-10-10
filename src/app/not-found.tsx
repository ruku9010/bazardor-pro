import { Button } from '@heroui/react'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col my-30 justify-center gap-3 items-center'>
      <h2 className='text-red-600 font-bold text-3xl'>Not Found</h2>
      <p className='text-red-300'>Could not find requested resource</p>
      <Link href="/"><Button>Return Home</Button></Link>
    </div>
  )
}