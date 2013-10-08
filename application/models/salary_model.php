<?php
class salary_model extends CI_Model{

    var $table = 'salary';

    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    function addsalary($data){
        return $this->db->insert($this->table,$data);
    }


    function getsalary($data){
        $query = $this->db->get_where($this->table,$data);
        return $query->row();
    }

    function getsalaryList($data){
        $query = $this->db->get_where($this->table,$data);
        return $query->result_array();
    }

    function getsalarySumBydepartmentID($departmentID) {
        $sql = "select count(*) as c, sum(A.salary) as s from salary A ,student B, department C where A.stuno=B.stuno and B.departmentID=C.id and C.id=? and A.status!=0";
        $query = $this->db->query($sql,array($departmentID));
        return $query->row_array();
    }
        

    function getsalaryBydepartmentID($departmentID) {
        $sql = "select A.id, A.stuno, B.name, B.sex, B.college, B.grade, B.stuCard, A.salary, A.remark ,A.status from salary A ,student B, department C where A.stuno=B.stuno and B.departmentID=C.id and C.id=?";
        $query = $this->db->query($sql,array($departmentID));
        return $query->result_array();
    }

    function hasSubmit() {
        $this->db->select_max('status');
        $query = $this->db->get($this->table);
        $result = $query->row();
        $maxStatus = $result->status;
        if($maxStatus>1) {
            return TRUE;
        }else {
            return FALSE;
        }
    }

    function updatesalary($data,$title) {
        $this->db->update_batch($this->table,$data,$title);        
    }

    function updateSinglesalary($data,$stuno) {
        $this->db->update($this->table, $data, array('stuno' => $stuno));
    }

    function delsalary($data){
        return $this->db->delete($this->table,$data);
    }

}
?>
