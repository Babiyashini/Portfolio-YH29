# Use official nginx image
FROM nginx:alpine

# Copy portfolio files to nginx web directory
COPY ../index.html /usr/share/nginx/html/
COPY ../css/ /usr/share/nginx/html/css/
COPY ../js/ /usr/share/nginx/html/js/
COPY ../assets/ /usr/share/nginx/html/assets/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]