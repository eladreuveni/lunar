import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Hello world</h1>
      <h3><Link href="/users">Users Page</Link></h3>
      <h3><Link href="/game">Game Page</Link></h3>
    </main>
  )
}
