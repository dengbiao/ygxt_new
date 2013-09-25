<?php
class Salary_h_model extends CI_Model{

    var $table = 'SalaryHistory';

    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    function getSalaryYearSum() {
        //$sql = "select year, sum(salary) as yearSum from SalaryHistory group by year";
        $this->db->select_sum('salary', 'yearSum');
        $this->db->select('year');
        $this->db->distinct();
        $this->db->group_by('year');
        $query = $this->db->get($this->table); 
        return $query->result_array();
    }

    function getSalaryDepartSum() {
        $this->db->select_sum('SalaryHistory.salary', 'departSum');
        $this->db->select('Department.name as department');
        $this->db->distinct();
        $this->db->join('Department','Department.id=SalaryHistory.departmentid');
        $this->db->group_by('Department.name');
        $query = $this->db->get($this->table); 
        return $query->result_array();
    }

    function getSalaryListByDate($year, $month) {
        $sql = "select B.name, B.stuno, A.salary, A.status, A.remark, C.name as department from SalaryHistory A,Student B,Department C
            where A.stuno=B.stuno and B.departmentID=C.id and A.year=? and A.month=? order by A.id desc";
        $query = $this->db->query($sql, array($year,$month));
        return $query->result_array();
    }

    function getSalaryList($num, $offset){
        $sql = "select B.name, B.stuno, A.salary, A.status, A.remark, C.name as department from SalaryHistory A,Student B,Department C
            where A.stuno=B.stuno and B.departmentID=C.id order by A.id desc limit ?,?";
        $query = $this->db->query($sql, array($offset,$num));
        return $query->result_array();
    }

    function getSalarySum() {
        $this->db->select_sum('salary');
        $query = $this->db->get($this->table);
        $result = $query->row();
        return $result->salary;
    }

    function getSalaryNum() {
        $this->db->from($this->table);
        $query = $this->db->get();
        return $query->num_rows();
    }

    function updateSalary($data,$title) {
        $this->db->update_batch($this->table,$data,$title);        
    }



}
?>
