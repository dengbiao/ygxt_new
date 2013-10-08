<?php
class Department_model extends CI_Model{

    var $table = 'department';

    function __construct(){
        parent::__construct();
    }

    function addDepartment($data){
        return $this->db->insert($this->table,$data);
    }


    function getDepartment($data){
        $query = $this->db->get_where($this->table,$data);
        return $query->row();
    }

    function getDepartmentList($data){
        $query = $this->db->get_where($this->table,$data);
        return $query->result_array();
    }

    function updateDepartment($id,$data){
        $this->db->where('id',$id);
        return $this->db->update($this->table, $data); 
    }

    function delDepartment($data){
        return $this->db->delete($this->table,$data);
    }

}
?>
