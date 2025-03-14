import Link from 'next/link';
import './globals.css';
import './styles/navigation.css';
import StyledLayout from './components/StyledLayout'

export const metadata = {
  title: 'Planner Digital',
  description: 'Organize sua vida de forma eficiente',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledLayout>
          {children}
        </StyledLayout>
      </body>
    </html>
  );
}
