import { Accordion, AccordionTab } from "primereact/accordion";

export default function FAQ() {

  return (

    <div className="p-6">

      <div className="text-center mb-6">

        <h2 style={{ fontSize: "2.5rem", color: "#1e293b" }}>
          Questions fréquentes
        </h2>

        <p style={{ fontSize: "1.2rem", color: "#64748b" }}>
          Tout ce que vous devez savoir sur NYOTA
        </p>

      </div>

      <div style={{ maxWidth: "800px", margin: "auto" }}>

        <Accordion>

          <AccordionTab header="Le test psychométrique est-il gratuit ?">

            Oui. Le test est entièrement gratuit pour les candidats.
            Il vous permet de découvrir vos forces et votre style
            professionnel.

          </AccordionTab>

          <AccordionTab header="Combien de temps dure le test ?">

            Le test comporte 72 questions et prend généralement
            entre 10 et 15 minutes à compléter.

          </AccordionTab>

          <AccordionTab header="Comment fonctionne le matching ?">

            NYOTA analyse votre personnalité, vos compétences et
            vos aspirations pour vous connecter aux opportunités
            professionnelles adaptées.

          </AccordionTab>

          <AccordionTab header="Mes données sont-elles sécurisées ?">

            Oui. Toutes vos données sont protégées et utilisées
            uniquement pour améliorer votre expérience et vos
            opportunités professionnelles.

          </AccordionTab>

        </Accordion>

      </div>

    </div>

  );

}