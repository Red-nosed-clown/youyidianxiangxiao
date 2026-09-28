import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'有一点想笑 · PERSONAL ARCHIVE',description:'关于舞蹈、生活与影像。不设限，不急着被定义。',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="zh-CN"><body>{children}</body></html>; }

