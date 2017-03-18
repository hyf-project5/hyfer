import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngCookies from 'angular-cookies';
import 'angular-material/angular-material.css';

import '../assets/scss/index.scss';

angular.module('hyferApp', [uiRouter, ngMaterial, ngCookies]);