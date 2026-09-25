import { Bot, Cloud, CodeXml, Database, Server, Smartphone, type LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  bot: Bot,
  cloud: Cloud,
  code: CodeXml,
  database: Database,
  server: Server,
  smartphone: Smartphone,
}

export function iconFor(name: string): LucideIcon {
  return iconMap[name] ?? CodeXml
}
