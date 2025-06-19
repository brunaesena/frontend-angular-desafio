# Etapa 1: build do Angular
FROM node:18-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Etapa 2: servidor nginx para servir os arquivos
FROM nginx:stable-alpine

# Remove o default.conf do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia o novo config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o build do Angular
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
