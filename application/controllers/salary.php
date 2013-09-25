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

        $maxStatus = $this->testStatus();
        if($maxStatus > 1 ) {
            $this->load->view('salary_check_read',$data);
        }else {
            $this->load->view('salary_check',$data);
        }
	}

    public function statistics()
    {
        //echo "statistics";
        $this->load->view('salary_statistics');
    }

    public function history()
    {
        //echo "history";
        $sid = $this->uri->segment(3);
        $this->load->library('pagination');    
        $config['base_url'] = site_url("salary/history");
        $config['total_rows'] = $this->salary_h->getSalaryNum();
        $config['per_page'] = 13; 
        $config['use_page_numbers'] = TRUE;
        $config['uri_segment'] = 3;
        $pageNum=$this->uri->segment(3)?$this->uri->segment(3):1;
        $pageNum==1 ? $offset=0 : $offset=$config['per_page']*($pageNum-1);

        $salaryList=$this->salary_h->getSalaryList($config['per_page'],$offset);
        
        $this->pagination->initialize($config); 
        $pager=$this->pagination->create_links();

        $data['pager']=$pager;
        $data['salaryList']=$salaryList;
        $data['total_num']=$config['total_rows'];
        //echo $salaryList;
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

    public function testStatus() {
        $result = $this->salary->hasSubmit();
        return $result->status;
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
