<?php
class Salary_model extends CI_Model{

    var $table = 'Salary';

    function __construct(){
        parent::__construct();
        $this->load->database();
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

    function getSalarySumByDepartmentID($departmentID) {
        $sql = "select count(*) as c, sum(A.salary) as s from Salary A ,Student B, Department C where A.stuno=B.stuno and B.departmentID=C.id and C.id=? and A.status!=0";
        $query = $this->db->query($sql,array($departmentID));
        return $query->row_array();
    }
        

    function getSalaryByDepartmentID($departmentID) {
        $sql = "select A.id, A.stuno, B.name, B.sex, B.college, B.grade, B.stuCard, A.salary, A.remark ,A.status from Salary A ,Student B, Department C where A.stuno=B.stuno and B.departmentID=C.id and C.id=?";
        $query = $this->db->query($sql,array($departmentID));
        return $query->result_array();
    }

    function hasSubmit() {
        $this->db->select_max('status');
        $query = $this->db->get($this->table);
        return $query-> row();
    }

    function updateSalary($data,$title) {
        $this->db->update_batch($this->table,$data,$title);        
    }

    function updateSingleSalary($data,$stuno) {
        $this->db->update($this->table, $data, array('stuno' => $stuno));
    }

    function delSalary($data){
        return $this->db->delete($this->table,$data);
    }

}
?>
