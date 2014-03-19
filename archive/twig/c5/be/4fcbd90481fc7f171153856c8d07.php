<?php

/* default/layout/hot_course_item.tpl */
class __TwigTemplate_c5be4fcbd90481fc7f171153856c8d07 extends Twig_Template
{
    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        $context['_parent'] = (array) $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["hot_courses"]) ? $context["hot_courses"] : null));
        foreach ($context['_seq'] as $context["_key"] => $context["hot_course"]) {
            echo "               
    ";
            // line 2
            if ($this->getAttribute($this->getAttribute((isset($context["hot_course"]) ? $context["hot_course"] : null), "extra_info"), "title")) {
                echo "        
        <div class=\"span9 hot-course-box\">
            <div class=\"well_border\">
                <div class=\"row\">
                    <div class=\"span2\">
                        <div class=\"thumbnail\">
                            <img src=\"";
                // line 8
                echo $this->getAttribute($this->getAttribute((isset($context["hot_course"]) ? $context["hot_course"] : null), "extra_info"), "course_image");
                echo "\" alt=\"\" /> 
                        </div>
                    </div>
                    <div class=\"span6\">
                        <div class=\"categories-course-description\">
                            <h3>";
                // line 13
                echo $this->getAttribute($this->getAttribute((isset($context["hot_course"]) ? $context["hot_course"] : null), "extra_info"), "title");
                echo "</h3>
                            <h5>";
                // line 14
                echo $this->getAttribute($this->getAttribute((isset($context["hot_course"]) ? $context["hot_course"] : null), "extra_info"), "teachers");
                echo "</h5>
                            ";
                // line 15
                echo $this->getAttribute($this->getAttribute((isset($context["hot_course"]) ? $context["hot_course"] : null), "extra_info"), "rating_html");
                echo "
                        </div>
                        <p>                                                            
                            ";
                // line 18
                echo $this->getAttribute($this->getAttribute((isset($context["hot_course"]) ? $context["hot_course"] : null), "extra_info"), "description_button");
                echo "
                            ";
                // line 19
                echo $this->getAttribute($this->getAttribute((isset($context["hot_course"]) ? $context["hot_course"] : null), "extra_info"), "go_to_course_button");
                echo "
                            ";
                // line 20
                echo $this->getAttribute($this->getAttribute((isset($context["hot_course"]) ? $context["hot_course"] : null), "extra_info"), "register_button");
                echo "
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ";
            }
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['hot_course'], $context['_parent'], $context['loop']);
        $context = array_merge($_parent, array_intersect_key($context, $_parent));
    }

    public function getTemplateName()
    {
        return "default/layout/hot_course_item.tpl";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  52 => 20,  48 => 19,  44 => 18,  38 => 15,  34 => 14,  30 => 13,  22 => 8,  13 => 2,  7 => 1,);
    }
}
