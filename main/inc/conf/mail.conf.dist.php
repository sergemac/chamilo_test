<?php

/**
 *	This file holds the configuration settings
 *	for phpmailer Class.
 *
 *	@package chamilo.configuration
 */

$platform_email['SMTP_FROM_EMAIL']   = (isset($administrator['email'])?$administrator['email']:'s.bayol@city-pro.info');
$platform_email['SMTP_FROM_NAME']    = (isset($administrator['name'])?$administrator['name']:'Serge');
$platform_email['SMTP_HOST']         = 'ns0.ovh.net';
$platform_email['SMTP_PORT']         = 587;
$platform_email['SMTP_MAILER']       = IS_WINDOWS_OS ? 'smtp' : 'mail'; // mail, sendmail or smtp
$platform_email['SMTP_AUTH']         = 1;
$platform_email['SMTP_USER']         = 's.bayol@city-pro.info';
$platform_email['SMTP_PASS']         = '145klf983j';
$platform_email['SMTP_CHARSET']      = api_get_system_encoding();