#!/bin/bash

echo 'This command builds a production release of the app. This means the AOT compiler is used and the code is optimized for production. See https://angular.io/guide/aot-compiler'
ng build --prod
