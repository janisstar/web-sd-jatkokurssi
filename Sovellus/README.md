# React + TypeScript + Vite

# User Manager Application

User Manager on verkkopohjainen käyttäjähallintasovellus, joka tarjoaa toimintoja rekisteröintiin, kirjautumiseen, profiilin päivittämiseen ja tilin poistamiseen. Sovellus on jaettu kahteen osaan:

- **Backend:** Toteutettu Node.js:ssä käyttäen Expressiä ja SQLiteä. API on dokumentoitu Swaggerin (OpenAPI) avulla.
- **Frontend:** Toteutettu Reactilla. Palvelinpuolen integrointiin käytetään automaattisesti luotua OpenAPI-määrittelyyn perustuvaa API-asiakasta.

## Backend

### Ominaisuudet
- **Käyttäjien rekisteröinti, valtuuttaminen, päivittäminen ja poistaminen.
- Salasanat tallennetaan hasheina (bcrypt).
- SQLite3-tietokanta käyttäjätietojen tallentamiseen.
- **Swagger / OpenAPI:**  
  - **Swagger UI:** Vuorovaikutteinen dokumentaatio on saatavilla osoitteessa: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
  - **OpenAPI JSON:** Spesifikaatio saatavilla osoitteessa: [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json)

Translated with DeepL.com (free version)


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



Frontend-sovellus on rakennettu Reactilla ja käyttää OpenAPI Generator -kirjastoa openapi.json-määrittelyyn perustuvan API-asiakkaan luomiseen. Näin frontend voi automaattisesti synkronoida palvelimen API-rajapintojen kanssa, mikä takaa tiukan tyypityksen ja vähentää dokumentaation ja toteutuksen välisten ristiriitojen riskiä.





--------------------------------------------------------------






## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
