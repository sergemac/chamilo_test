<?php
// Chamilo version 1.9.6
// File generated by /install/index.php script - Thu, 24 Oct 2013 14:09:31 +0000
/* For licensing terms, see /license.txt */
/**
 *		Virtual campus configuration
 *
 * This file contains a list of variables that can be modified by the campus
 * site's server administrator. Pay attention when changing these variables, 
 * some changes may cause Chamilo to stop working.
 * If you changed some settings and want to restore them, please have a look at
 * configuration.dist.php. That file is an exact copy of the config file at
 * install time.
 */

/**
 * $_configuration define only the bare essential variables
 * for configuring the platform (paths, database connections, ...). 
 * Changing a $_configuration variable CAN generally break the installation.
 * Besides the $_configuration, a $_settings array also exists, that 
 * contains variables that can be changed and will not break the platform.
 * These optional settings are defined in the database, now 
 * (table settings_current).
 * example: $_configuration['tracking_enabled'] (assuming that the install 
 * script creates the necessary tables anyway).
 */

/**
 * MYSQL connection settings
 */
// Your MySQL server
$_configuration['db_host']     = 'localhost';
// Your MySQL username
$_configuration['db_user']     = 'serge';
// Your MySQL password
$_configuration['db_password'] = 'crevette';

/**
 * Database settings
 */
// Is tracking enabled?
$_configuration['tracking_enabled']      = true;
// Is single database enabled (DO NOT MODIFY THIS)
$_configuration['single_database']       = false;
// Prefix for course tables (IF NOT EMPTY, can be replaced by another prefix, else leave empty)
$_configuration['table_prefix']          = '';
// Separator between database and table name (DO NOT MODIFY THIS)
$_configuration['db_glue']               = '`.`';
// prefix all created bases (for courses) with this string
$_configuration['db_prefix']             = '';
// main Chamilo database
$_configuration['main_database']         = 'chamilo';
// stats Chamilo database
$_configuration['statistics_database']   ='chamilo';
// User Personal Database (where all the personal stuff of the user is stored
// (personal agenda items, course sorting)
$_configuration['user_personal_database']='chamilo';

/**
 * Directory settings
 */
// URL to the root of your Chamilo installation, e.g.: http://www.mychamilo.com/
$_configuration['root_web']       = 'http://localhost/chamilo_test/';

// Path to the webroot of system, example: /var/www/
$_configuration['root_sys']       = 'C:/wamp/www/chamilo_test/';

// Path from your WWW-root to the root of your Chamilo installation, example: chamilo (this means chamilo is installed in /var/www/chamilo/
$_configuration['url_append']     = '/chamilo_test';

// Directory of the Chamilo code. You could change this but it is not advised since this has not been tested yet.
$_configuration['code_append']    = "main/";

// Directory to store all course-related files. You could change this but it is not advised since this has not been tested yet.
$_configuration['course_folder']  = "courses/";

// URL to your phpMyAdmin installation.
// If not empty, a link will be available in the Platform Administration
$_configuration['db_admin_path']  = '';

/**
 * 
 * Login modules settings
 */
// CAS IMPLEMENTATION
// -> Go to your portal Chamilo > Administration > CAS to activate CAS
// You can leave these lines uncommented even if you don't use CAS authentification
$extAuthSource["cas"]["login"] = $_configuration['root_sys'].$_configuration['code_append']."auth/cas/login.php";
$extAuthSource["cas"]["newUser"] = $_configuration['root_sys'].$_configuration['code_append']."auth/cas/newUser.php";
//
// NEW LDAP IMPLEMENTATION BASED ON external_login info
// -> Uncomment the two lines bellow to activate LDAP AND edit main/auth/external_login/ldap.conf.php for configuration
// $extAuthSource["extldap"]["login"] = $_configuration['root_sys'].$_configuration['code_append']."auth/external_login/login.ldap.php";
// $extAuthSource["extldap"]["newUser"] = $_configuration['root_sys'].$_configuration['code_append']."auth/external_login/newUser.ldap.php";
//
// FACEBOOK IMPLEMENTATION BASED ON external_login info
// -> Uncomment the line bellow to activate Facebook Auth AND edit main/auth/external_login/ldap.conf.php for configuration
// $_configuration['facebook_auth'] = 1;
//
// OTHER EXTERNAL LOGIN INFORMATION
// To fetch external login information, uncomment those 2 lines and modify  files auth/external_login/newUser.php and auth/external_login/updateUser.php files
// $extAuthSource["external_login"]["newUser"] = $_configuration['root_sys'].$_configuration['code_append']."auth/external_login/newUser.php";
// $extAuthSource["external_login"]["updateUser"] = $_configuration['root_sys'].$_configuration['code_append']."auth/external_login/updateUser.php";

/**
 * 
 * Hosting settings - Allows you to set limits to the Chamilo portal when
 * hosting it for a third party. These settings can be overwritten by an
 * optionally-loaded extension file with only the settings (no comments).
 * The settings use an index at the first level to represent the ID of the
 * URL in case you use multi-url (otherwise it will always use 1, which is
 * the ID of the only URL inside the access_url table).
 */
// Set a maximum number of users. Default (0) = no limit
$_configuration[1]['hosting_limit_users'] = 0;
// Set a maximum number of teachers. Default (0) = no limit
$_configuration[1]['hosting_limit_teachers'] = 0;
// Set a maximum number of courses. Default (0) = no limit
$_configuration[1]['hosting_limit_courses'] = 0;
// Set a maximum number of sessions. Default (0) = no limit
$_configuration[1]['hosting_limit_sessions'] = 0;
// Set a maximum disk space used, in MB (set to 1024 for 1GB, 5120 for 5GB).
// Default (0) = no limit
$_configuration[1]['hosting_limit_disk_space'] = 0;

/**
 * Content Delivery Network (CDN) settings. Only use if you need a separate 
 * server to serve your static data. If you don't know what a CDN is, you
 * don't need it. These settings are for simple Origin Pull CDNs and are
 * experimental. Enable only if you really know what you're doing.
 * This might conflict with multiple-access urls.
 */
// Set the following setting to true to start using the CDN
$_configuration['cdn_enable'] = false;
// The following setting will be ignored if the previous one is set to false
$_configuration['cdn'] = array(
  //You can define several CDNs and split them by extensions
  //Replace the following by your full CDN URL, which should point to
  // your Chamilo's root directory. DO NOT INCLUDE a final slash! (won't work)
  'http://cdn.chamilo.org' => array('.css','.js','.jpg','.jpeg','.png','.gif','.avi','.flv'),
  // copy the line above and modify following your needs
);

/**
 * Misc. settings
 */
// Verbose backup
$_configuration['verbose_backup']    = false;
// security word for password recovery
$_configuration['security_key']      = '8846ed2f2e6ae1d11888703aaf26dcca';
// Hash function method
$_configuration['password_encryption']      = 'sha1';
// You may have to restart your web server if you change this
$_configuration['session_stored_in_db']     = false;
// Session lifetime
$_configuration['session_lifetime']  = 360000;
// Activation for multi-url access
//$_configuration['multiple_access_urls']					= true;
$_configuration['software_name']     = 'Chamilo';
$_configuration['software_url']	     = 'http://www.chamilo.org/';
//Deny the elimination of users
$_configuration['deny_delete_users'] = false;
// Version settings
$_configuration['system_version']    = '1.9.6';
$_configuration['system_stable']     = true;
