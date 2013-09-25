<?php
class Salary_h_model extends CI_Model{

    var $table = 'SalaryHistory';

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

    function getSalaryListByDate($year, $month, $num, $offset) {
        $sql = "select B.name, B.stuno, A.salary, A.status, A.remark, C.name as department from SalaryHistory A,Student B,Department C
            where A.stuno=B.stuno and B.departmentID=C.id and A.year=? A.month=? order by A.id desc limit ?,?";
        $query = $this->db->query($sql, array($year,$month,$offset,$num));
        return $query->result_array();
    }

    function getSalaryList($num, $offset){
        $sql = "select B.name, B.stuno, A.salary, A.status, A.remark, C.name as department from SalaryHistory A,Student B,Department C
            where A.stuno=B.stuno and B.departmentID=C.id order by A.id desc limit ?,?";
        $query = $this->db->query($sql, array($offset,$num));
        return $query->result_array();
    }


    function getSalaryNum() {
        $this->db->from($this->table);
        $query = $this->db->get();
        return $query->num_rows();
    }

    function updateSalary($data,$title) {
        $this->db->update_batch($this->table,$data,$title);        
    }


    function delSalary($data){
        return $this->db->delete($this->table,$data);
    }

}
?>
