import Link from 'next/link';
import './header.css';
 
export default function Header() {
    return(
        <header>
            <div id="id-logo">
                <h1>Stock</h1>
            </div>
            <nav id="menu-container">
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/pages/Chat">Chat</Link>
                    </li>
                    <li>
                        <Link href="/pages/About">About</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}