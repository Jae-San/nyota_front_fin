const candidateSteps = [
  {
    step: 1,
    title: "Informations personnelles",
    fields: [
      { name: "first_name", label: "Prénom", type: "text", placeholder: "Votre prénom", required: true },
      { name: "last_name", label: "Nom", type: "text", placeholder: "Votre nom", required: true },
      { name: "gender", label: "Genre", type: "select", options: ["Homme", "Femme", "Autre"], required: true },
    ],
  },
  {
    step: 2,
    title: "Expérience professionnelle",
    subtitle: "Parlez-nous de votre parcours professionnel",
    fields: [
      { name: "current_industry", label: "Dans quelle industrie avez-vous travaillé ?", type: "text", placeholder: "Ex: Technologie, Finance, Santé..." },
      { name: "target_industry", label: "Dans quelle industrie souhaitez-vous travailler ?", type: "text", placeholder: "Ex: Technologie, Finance, Santé..." },
      { name: "experience_years", label: "Combien d'années d'expérience avez-vous ?", type: "number", placeholder: "Nombre d'années" },
      { name: "specialization", label: "Dans quel domaine avez-vous obtenu une spécialisation ?", type: "text", placeholder: "Votre spécialisation" },
      { name: "has_previous_exp", label: "Avez-vous une expérience professionnelle antérieure ?", type: "select", options: ["Oui", "Non"] },
    ],
  },
  {
    step: 3,
    title: "Préférences de travail",
    subtitle: "Comment souhaitez-vous travailler ?",
    fields: [
      { name: "work_condition", label: "Dans quelle condition aimeriez-vous travailler ?", type: "select", options: ["Présentiel", "Télétravail", "Hybride", "Flexible"] },
      { name: "open_to_remote_country", label: "Êtes-vous ouvert à travailler dans un pays autre que votre pays actuel ?", type: "select", options: ["Oui", "Non"] },
      { name: "current_location", label: "Où êtes-vous actuellement situé ?", type: "text", placeholder: "Ville, Pays" },
      { name: "nationality", label: "Quelle est votre nationalité ?", type: "text", placeholder: "Votre nationalité" },
      { name: "start_date", label: "A quel moment seriez-vous prêt à débuter ?", type: "select", options: ["Immédiatement", "Dans une semaine", "Dans un mois", "Dans trois mois", "Dans 6 mois", "Dans un an", "Dans plus d'un an"] },
    ],
  },
  {
    step: 4,
    title: "Poste visé",
    subtitle: "Quel type de poste recherchez-vous ?",
    fields: [
      { name: "target_job", label: "Quel poste recherchez-vous ?", type: "text", placeholder: "Ex: Développeur Full Stack, Chef de projet..." },
      { name: "job_level", label: "Quel niveau de poste visez-vous ?", type: "select", options: ["Junior", "Intermédiaire", "Senior", "Lead / Manager", "Directeur / Executive"] },
      { name: "min_salary", label: "Salaire minimum attendu", type: "currency-input", placeholder: "Ex: 150 000 XOF/mois" },
      /*{ name: "currency", label: "Devise", type: "select", options: ["XOF", "XAF", "USD", "EUR", "CAD", "GBP"] },*/
    ],
  },
  {
    step: 5,
    title: "Compétences linguistiques",
    subtitle: "Dans quelles langues pouvez-vous travailler ?",
    fields: [
        {
        name: "languages",
        label: "Langues",
        type: "language-grid",
        options: [
            "Français","Anglais","Arabe","Espagnol","Portugais","Allemand","Italien",
            "Néerlandais","Wolof","Bambara","Swahili","Lingala","Hausa",
            "Peul","Yoruba","Igbo","Zoulou","Amharique","Somali",
            "Ewé","Fon","Kinyarwanda","Twi","Shona","Kirundi","Malagasy"
        ]
        },
        {
        name: "other_languages",
        label: "Autres (précisez)",
        type: "text",
        placeholder: "Ex: Coréen, Turc..."
        }
    ]
   },
  {
    step: 6,
    title: "Formation et éducation",
    subtitle: "Parlez-nous de votre parcours académique",
    fields: [
      { name: "education_level", label: "Plus haut niveau d'éducation", type: "select", options: ["Lycée / Baccalauréat", "Licence / Bachelor", "Master", "Doctorat / PhD", "Autre"] },
      { name: "school_name", label: "Dernier établissement fréquenté", type: "text", placeholder: "Nom de l'établissement" },
    ],
  },
  
{
  step: 7,
  title: "Votre CV",
  subtitle: "Importez votre CV (PDF, Word, etc.)",
  fields: [
    {
      name: "cv_file",
      label: "Cliquez pour télécharger votre CV",
      type: "file",
      accept: ".pdf,.doc,.docx,.txt,.rtf",
    },
    {
      name: "other_docs",
      label: "Autres documents (optionnel)",
      type: "file",
      accept: ".pdf,.jpg,.png,.txt",
      multiple: true,
    },
  ],
},
  {
    step: 8,
    title: "Créez votre compte",
    subtitle: "Dernière étape avant de commencer !",
    fields: [
      { name: "email", label: "Adresse e-mail", type: "email", placeholder: "votre.email@exemple.com", required: true },
      { name: "password", label: "Mot de passe", type: "password", placeholder: "Minimum 8 caractères", required: true },
      { name: "confirm_password", label: "Confirmer le mot de passe", type: "password", placeholder: "Confirmez votre mot de passe", required: true },
    ],
  },
];

export default candidateSteps;