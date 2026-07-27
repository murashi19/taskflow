import { ClientProjectDetail } from "@/components/features/client/client-project-detail";

interface ClientProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientProjectPage({ params }: ClientProjectPageProps) {
  const { id } = await params;

  return <ClientProjectDetail projectId={id} />;
}
