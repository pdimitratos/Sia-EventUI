import config from 'config'

let manifest = {
    "name": "SIA",
    "description": "SIA",
    "version": "0.0.0.2",
    "manifest_version": 2,
    "browser_action": {
        "default_popup": "extension.html"
      },
      "content_scripts" : [{
        "matches": [],
        "js":["ticketHook.js"],
        "css":["ticketHook.css"]
      }],
      "background": {
        "scripts":["messager.js"]
      },
      "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
      "author": "microsoft",
      "permissions": [
        "identity",
        "tabs",
        "https://*/"
      ]
  }