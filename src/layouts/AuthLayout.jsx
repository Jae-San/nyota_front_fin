import logo from "../assets/Logo_NYOTA.svg";

export default function AuthLayout({ children }) {
  return (
    // 'w-full' au lieu de 'w-screen' pour éviter les barres de défilement horizontales
    // 'overflow-x-hidden' est une sécurité supplémentaire
    <div className="min-h-screen w-full flex flex-column align-items-center justify-content-center surface-ground p-3 m-0 overflow-x-hidden">
      
      {/* Header : Un peu plus d'espace en bas (mb-5) */}
      <header className="flex align-items-center justify-content-center gap-3 mb-5 w-full">
        <img src={logo} alt="NYOTA" style={{ height: '70px' }} /> {/* Logo légèrement agrandi */}
        <h1 className="text-5xl font-bold m-0 text-900"></h1>
      </header>

      {/* Main : C'est ici qu'on gère la taille de la carte */}
      <main className="flex justify-content-center w-full">
        {/* On définit une largeur maximale large (max-w-30rem ou 35rem) 
            mais on garde w-full pour que ça rétrécisse sur mobile */}
        <div className="w-full flex justify-content-center" style={{ maxWidth: '500px' }}>
            {children}
        </div>
      </main>

      <footer className="mt-8 text-500 font-medium text-center">
        © {new Date().getFullYear()} NYOTA — Tous droits réservés
      </footer>
    </div>
  );
}