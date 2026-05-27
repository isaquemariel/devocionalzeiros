/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { template as aulasOtpTemplate } from './aulas-otp.tsx'
import { template as aulasWelcomeTemplate } from './aulas-welcome.tsx'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  to?: string | ((data: any) => string)
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'aulas-otp': aulasOtpTemplate,
  'aulas-welcome': aulasWelcomeTemplate,
}
