const express = require('express');

module.exports = (app) => {
  //ce middleware intercepte les requête qui ont un content type json 
  //et nous met a disposition ce contenu sur l'objet requête dans req.body
  app.use(express.json());
  app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API.
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
      next();
  });
}


