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
        $this->load->view('salary_check',$data);
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
}

?>
