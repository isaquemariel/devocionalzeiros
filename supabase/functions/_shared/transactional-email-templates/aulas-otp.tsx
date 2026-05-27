/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface AulasOtpProps {
  code?: string
  recipient?: string
}

export const AulasOtpEmail = ({ code = '000000' }: AulasOtpProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Seu código de acesso à Área de Membros</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Área de Membros — Devocionalzeiros</Heading>
        <Text style={text}>
          Use o código abaixo para entrar na área de membros. Ele expira em 15 minutos.
        </Text>
        <Text style={codeStyle}>{code}</Text>
        <Text style={footer}>
          Se você não solicitou este código, pode ignorar este e-mail com segurança.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AulasOtpEmail,
  subject: (d: AulasOtpProps) => `Seu código de acesso: ${d?.code ?? ''}`,
  displayName: 'Área de Membros — Código OTP',
  previewData: { code: '482913', recipient: 'user@example.test' },
} satisfies TemplateEntry

const main = { backgroundColor: '#0a0a0a', fontFamily: 'Montserrat, Arial, sans-serif' }
const container = { padding: '40px 28px', maxWidth: '560px', backgroundColor: '#111111', borderRadius: '12px', margin: '24px auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#fbbf24', margin: '0 0 20px', textAlign: 'center' as const }
const text = { fontSize: '15px', color: '#d4d4d4', lineHeight: '1.6', margin: '0 0 25px', textAlign: 'center' as const }
const codeStyle = {
  fontFamily: 'Courier, monospace',
  fontSize: '36px',
  fontWeight: 'bold' as const,
  color: '#fbbf24',
  letterSpacing: '10px',
  margin: '0 0 30px',
  textAlign: 'center' as const,
  backgroundColor: '#1a1a1a',
  padding: '20px',
  borderRadius: '8px',
}
const footer = { fontSize: '12px', color: '#888888', margin: '30px 0 0', lineHeight: '1.5', textAlign: 'center' as const }
