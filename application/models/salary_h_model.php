<?php
class Salary_h_model extends CI_Model{

    var $table = 'SalaryHistory';

    function __construct(){
        parent::__construct();
    }

    function addSalary($data){
        return $this->db->insert($this->table,$data);
    }


    function getSalary($data){
        $query = $this->db->get_where($this->table,$data);
        return $query->row();
    }

    function getSalaryList($data){
        $query = $this->db->get_where($this->table,$data);
        return $query->result_array();
    }

    function updateSalary($id,$data){
        $this->db->where('id',$id);
        return $this->db->update($this->table, $data); 
    }

    function delSalary($data){
        return $this->db->delete($this->table,$data);
    }

}
?>
