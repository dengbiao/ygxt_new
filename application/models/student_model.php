<?php
class Student_model extends CI_Model{

    var $table = 'Student';

    function __construct(){
        parent::__construct();
    }

    function addStudent($data){
        return $this->db->insert($this->table,$data);
    }


    function getStudent($data){
        $query = $this->db->get_where($this->table,$data);
        return $query->row();
    }

    function getStudentList($data){
        $query = $this->db->get_where($this->table,$data);
        return $query->result_array();
    }

    function updateStudent($id,$data){
        $this->db->where('id',$id);
        return $this->db->update($this->table, $data); 
    }

    function delStudent($data){
        return $this->db->delete($this->table,$data);
    }

}
?>
