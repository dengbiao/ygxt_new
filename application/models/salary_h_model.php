<?php
class salary_h_model extends CI_Model{

    var $table = 'salaryhistory';

    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    function getsalaryYearSum() {
        //$sql = "select year, sum(salary) as yearSum from salaryhistory group by year";
        $this->db->select_sum('salary', 'yearSum');
        $this->db->select('year');
        $this->db->distinct();
        $this->db->group_by('year');
        $query = $this->db->get($this->table); 
        return $query->result_array();
    }

    function getsalaryDepartSum() {
        $this->db->select_sum('salaryhistory.salary', 'departSum');
        $this->db->select('department.name as department');
        $this->db->distinct();
        $this->db->join('department','department.id=salaryhistory.departmentid');
        $this->db->group_by('department.name');
        $query = $this->db->get($this->table); 
        return $query->result_array();
    }

    function getsalaryListByDate($year, $month) {
        $sql = "select B.name, B.stuno, A.salary, A.status, A.remark, C.name as department from salaryhistory A,student B,department C
            where A.stuno=B.stuno and B.departmentID=C.id and A.year=? and A.month=? order by A.id desc";
        $query = $this->db->query($sql, array($year,$month));
        return $query->result_array();
    }

    function getsalaryList($num, $offset){
        $sql = "select B.name, B.stuno, A.salary, A.status, A.remark, C.name as department from salaryhistory A,student B,department C
            where A.stuno=B.stuno and B.departmentID=C.id order by A.id desc limit ?,?";
        $query = $this->db->query($sql, array($offset,$num));
        return $query->result_array();
    }

    function getsalarySum() {
        $this->db->select_sum('salary');
        $query = $this->db->get($this->table);
        $result = $query->row();
        return $result->salary;
    }

    function getsalaryNum() {
        $this->db->from($this->table);
        $query = $this->db->get();
        return $query->num_rows();
    }

    function updatesalary($data,$title) {
        $this->db->update_batch($this->table,$data,$title);        
    }



}
?>
