export const dynamic = 'force-static'

export async function GET() {
  return Response.json({ message: "Esta é uma versão estática da API" })
} 