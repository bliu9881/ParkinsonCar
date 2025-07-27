import { Chat } from "./Chat";

// Generate static params for static export
export async function generateStaticParams() {
  // Return an empty array for now - this will be populated when we have actual chat IDs
  // In a real app, you might fetch this from your database
  return [];
}

export default function ChatPage({ params }: { params: { id: string } }) {
  return <Chat id={params.id} />;
}
