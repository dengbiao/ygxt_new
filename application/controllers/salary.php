<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Salary extends CI_Controller {

    
    function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        $this->load->model('Salary_model','salary');
        $this->load->model('Salary_h_model','salary_h');
    }


	public function check()
    {
        $data['salaryList'] = $this->salary->getSalaryByDepartmentID(1);
        $sum = $this->salary->getSalarySumByDepartmentID(1);
        $data['count'] = $sum['c'];
        $data['sum'] = $sum['s'];
        if($this->salary->hasSubmit() ){ 
            $this->load->view('salary_check_read',$data);
        }else {
            $this->load->view('salary_check',$data);
        }
	}

    public function statistics()
    {
        //echo "statistics";
        $data['salarySum']=$this->salary_h->getSalarySum();
        $data['salaryYearSum']=$this->salary_h->getSalaryYearSum();
        //print_r($data['salaryYearSum']);
        $data['salaryDepartSum']=$this->salary_h->getSalaryDepartSum();
        $this->load->view('salary_statistics',$data);
    }

    public function history()
    {
        //echo "history";
        $year = $this->input->post('year');
        $month = $this->input->post('month');
        $data['flag'] = 1;
        if($year) {
            $data['init'] = false;
            $data['year'] = $year;
            $data['month'] = $month;
            $salaryList=$this->salary_h->getSalaryListByDate($year,$month);
            $data['salaryList']=$salaryList;
        }
        $this->load->view('salary_history',$data);    
    }


    public function changeStatus($stuno, $status) {
        if( $status == 0 ){
            //加入考核
            $status = 1;
        }else {
            $status = 0;
        }
        $data['status'] = $status;
        $this->salary->updateSingleSalary($data, $stuno); 
        redirect('/salary/check', 'refresh');
    }


    public function handle() {
        if(isset($_POST['save'])) {
            //handle save event
            $size = sizeof($this->input->post('stunos'));
            $stunos = $this->input->post('stunos');
            $salary = $this->input->post('salary');
            $remark = $this->input->post('remark');

            
            $resultArray = array();
            $fields= array("stuno","salary","remark");
            for($i=0;$i<$size;$i++) {
                $row = array($stunos[$i],$salary[$i],$remark[$i]);
                $r = array_combine($fields,$row);
                $resultArray[] = $r;
            }
            //print_r($resultArray);
            $this->salary->updateSalary($resultArray, 'stuno');
            redirect('/salary/check', 'refresh');
        } 
        if(isset($_POST['submit'])) {
            //handle submit event
            $size = sizeof($this->input->post('stunos'));
            $stunos = $this->input->post('stunos');
            $salary = $this->input->post('salary');
            $remark = $this->input->post('remark');

            
            $resultArray = array();
            $fields= array("stuno","salary","status","remark");
            for($i=0;$i<$size;$i++) {
                $row = array($stunos[$i],$salary[$i],2,$remark[$i]);
                $r = array_combine($fields,$row);
                $resultArray[] = $r;
            }
            //print_r($resultArray);
            $this->salary->updateSalary($resultArray, 'stuno');
            redirect('/salary/check', 'refresh');
        }

    }
}

?>
