<?php

/* default/layout/course_navigation.tpl */
class __TwigTemplate_98162496ed2fb6e4f593a7f9de9a4bb4 extends Twig_Template
{
    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 2
        if (((isset($context["show_header"]) ? $context["show_header"] : null) == true)) {
            // line 3
            echo "
    ";
            // line 4
            if ((!(null === (isset($context["show_course_shortcut"]) ? $context["show_course_shortcut"] : null)))) {
                // line 5
                echo "        <div class=\"span12\">
            ";
                // line 6
                echo (isset($context["show_course_shortcut"]) ? $context["show_course_shortcut"] : null);
                echo "
        </div>
    ";
            }
            // line 9
            echo "
    ";
            // line 10
            if ((!(null === (isset($context["show_course_navigation_menu"]) ? $context["show_course_navigation_menu"] : null)))) {
                echo "    
        <script>                    
            \$(document).ready( function() {
                if (readCookie('menu_state') == 0) {
                    swap_menu();
                }
            });                    
            function createCookie(name, value, days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    var expires = \"; expires=\"+date.toGMTString();
                }
                else var expires = \"\";
                document.cookie = name+\"=\"+value+expires+\"; path=/\";
            }
            function readCookie(name) {
                var nameEQ = name + \"=\";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++)
                {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1,c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                }
                return null;
            }
            function swap_menu() {
                toolnavlist_el = document.getElementById('toolnav');
                center_el = document.getElementById('center');
                swap_menu_link_el = document.getElementById('swap_menu_link');

                if (toolnavlist_el.style.display == 'none') {
                    toolnavlist_el.style.display = '';
                    if (center_el) {
                        center_el.style.margin = '0 190px 0 0';
                    }
                    swap_menu_link_el.innerHTML = '";
                // line 47
                echo get_lang("Hide");
                echo "';
                    createCookie('menu_state',1,10);
                } else {
                    toolnavlist_el.style.display = 'none';
                    if (center_el) {
                        center_el.style.margin = '0 0 0 0';
                    }
                    swap_menu_link_el.innerHTML = '";
                // line 54
                echo get_lang("Show");
                echo "';
                    createCookie('menu_state',0,10);
                }
            }
            document.write('<div class=\"span12 pull-right\"> <a class=\"btn\" href=\"javascript: void(0);\" id=\"swap_menu_link\" onclick=\"javascript: swap_menu();\">";
                // line 58
                echo get_lang("Hide");
                echo "<\\/a></div>');                    
            </script>                    
    ";
                // line 60
                echo (isset($context["show_course_navigation_menu"]) ? $context["show_course_navigation_menu"] : null);
                echo "
    ";
            }
        }
    }

    public function getTemplateName()
    {
        return "default/layout/course_navigation.tpl";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  62 => 29,  40 => 20,  36 => 18,  9 => 3,  217 => 77,  210 => 75,  204 => 74,  198 => 73,  192 => 72,  187 => 70,  180 => 68,  176 => 66,  170 => 63,  163 => 61,  158 => 58,  143 => 53,  116 => 44,  109 => 42,  102 => 40,  90 => 38,  84 => 37,  79 => 35,  74 => 35,  59 => 28,  47 => 26,  33 => 13,  21 => 7,  17 => 6,  12 => 4,  365 => 305,  126 => 69,  122 => 45,  114 => 66,  110 => 65,  96 => 46,  41 => 14,  28 => 14,  23 => 9,  19 => 6,  15 => 5,  179 => 86,  171 => 81,  165 => 62,  162 => 76,  149 => 54,  147 => 67,  141 => 63,  135 => 60,  132 => 50,  129 => 58,  123 => 54,  117 => 50,  111 => 47,  108 => 46,  105 => 45,  101 => 42,  95 => 39,  92 => 38,  89 => 37,  83 => 58,  67 => 23,  60 => 34,  49 => 16,  45 => 22,  38 => 10,  32 => 9,  29 => 11,  18 => 4,  14 => 5,  10 => 2,  7 => 2,  73 => 27,  66 => 47,  63 => 22,  53 => 25,  50 => 7,  43 => 12,  30 => 11,  27 => 10,  25 => 5,  22 => 5,  20 => 11,  282 => 126,  276 => 123,  270 => 121,  265 => 118,  262 => 117,  259 => 116,  251 => 111,  246 => 108,  243 => 107,  240 => 105,  234 => 83,  228 => 100,  225 => 80,  219 => 95,  216 => 94,  214 => 93,  211 => 92,  205 => 89,  199 => 87,  196 => 85,  194 => 84,  188 => 82,  185 => 80,  177 => 75,  172 => 72,  169 => 71,  166 => 69,  160 => 66,  157 => 65,  154 => 71,  148 => 59,  142 => 57,  139 => 56,  137 => 52,  133 => 53,  130 => 52,  124 => 50,  118 => 67,  112 => 44,  106 => 41,  100 => 38,  94 => 35,  88 => 60,  82 => 40,  76 => 54,  70 => 34,  64 => 20,  61 => 12,  58 => 28,  55 => 16,  52 => 15,  48 => 6,  42 => 21,  39 => 23,  37 => 13,  34 => 17,  31 => 5,  26 => 10,);
    }
}
