<?php
class Person
{
    function _construct($name,$sex){
        $this->name=$name;
        $this->sex=$sex;
    }
    function showName(){
        echo $this->name;
    }
    function sex(){
        echo $this->sex;
    }
}
$p1=new Person("ross","man");
$p1->showName();
?>
