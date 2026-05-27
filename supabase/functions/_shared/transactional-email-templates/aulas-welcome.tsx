/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface AulasWelcomeProps {
  customerName?: string
  productName?: string
  recipient?: string
}

export const AulasWelcomeEmail = ({
  customerName,
  productName = 'seu curso',
}: AulasWelcomeProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Sua compra foi confirmada — acesse sua área de membros</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Compra confirmada! 🎉</Heading>
        <Text style={text}>
          {customerName ? `Olá, ${customerName}! ` : 'Olá! '}
          Recebemos sua compra de <strong style={{ color: '#fbbf24' }}>{productName}</strong> e seu acesso já está liberado.
        </Text>

        <Section style={{ textAlign: 'center' as const, margin: '30px 0' }}>
          <Button href="https://devocionalzeiros.com.br/aulas/login" style={button}>
            Acessar minha área de membros
          </Button>
        </Section>

        <Section style={infoBox}>
          <Text style={infoTitle}>Como entrar:</Text>
          <Text style={infoText}>
            1. Clique no botão acima<br />
            2. Digite o <strong>mesmo e-mail desta compra</strong><br />
            3. Você receberá um código de 6 dígitos para entrar
          </Text>
        </Section>

        <Text style={text}>
          Precisa de ajuda? Fale com a gente no WhatsApp:{' '}
          <a href="https://wa.me/5584999488698" style={link}>+55 84 99948-8698</a>
        </Text>

        <Text style={footer}>
          Bons estudos!<br />
          Equipe Devocionalzeiros
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AulasWelcomeEmail,
  subject: 'Sua compra foi confirmada — acesse sua área de membros',
  displayName: 'Área de Membros — Boas-vindas',
  previewData: {
    customerName: 'Maria',
    productName: 'Os Segredos do Livro de Enoque',
    recipient: 'user@example.test',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#0a0a0a', fontFamily: 'Montserrat, Arial, sans-serif' }
const container = {
  padding: '40px 28px',
  maxWidth: '560px',
  backgroundColor: '#111111',
  borderRadius: '12px',
  margin: '24px auto',
}
const h1 = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  color: '#fbbf24',
  margin: '0 0 20px',
  textAlign: 'center' as const,
}
const text = {
  fontSize: '15px',
  color: '#d4d4d4',
  lineHeight: '1.6',
  margin: '0 0 18px',
}
const button = {
  backgroundColor: '#fbbf24',
  color: '#0a0a0a',
  padding: '14px 28px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  display: 'inline-block',
}
const infoBox = {
  backgroundColor: '#1a1a1a',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
}
const infoTitle = {
  fontSize: '14px',
  fontWeight: 'bold' as const,
  color: '#fbbf24',
  margin: '0 0 10px',
}
const infoText = {
  fontSize: '14px',
  color: '#d4d4d4',
  lineHeight: '1.8',
  margin: '0',
}
const link = { color: '#fbbf24', textDecoration: 'none' }
const footer = {
  fontSize: '13px',
  color: '#888888',
  margin: '30px 0 0',
  lineHeight: '1.5',
  textAlign: 'center' as const,
}
