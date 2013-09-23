<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class CheckSalary extends CI_Controller {

    
    function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
    }


	public function index()
	{
        $this->load->library('pagination');    
        $config['base_url'] = site_url("http://localhost/checkSalary/index");
        $config['total_rows'] = 16;
        $config['per_page'] = 10; 
        $config['use_page_numbers'] = TRUE;
        //$config['uri_segment'] = 5;
        //$pageNum=$this->uri->segment(5)?$this->uri->segment(5):1;
        //$pageNum==1 ? $offset=0 : $offset=$config['per_page']*($pageNum-1);
        //$adminList=$this->admin->getAdminListByPage($config['per_page'],$offset);
        $this->pagination->initialize($config); 
        $pager=$this->pagination->create_links();
        $data['pager']=$pager;
        $this->load->view('checkSalary',$data);
	}
}

?>
