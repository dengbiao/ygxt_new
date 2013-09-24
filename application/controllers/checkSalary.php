<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class CheckSalary extends CI_Controller {

    
    function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        //$this->load->database();
        $this->load->model('Salary_model','salary');
        //$this->load->model('Student_model','student');
    }


	public function index()
    {
        //this->student->getStudent(array('stuno'=>'124611158'));
        //
        $data['salaryList'] = $this->salary->getSalaryByDepartmentID(1);
        $this->load->view('checkSalary',$data);
	}
}

?>
