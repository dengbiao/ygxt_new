<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Admin extends CI_Controller {

    
    function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
    }


	public function index()
	{
        $this->load->view('index');
	}

	public function top()
	{
		$this->load->view('top');
	}


	public function left()
	{
		$this->load->view('left');
	}
    
	public function right()
	{
		$this->load->view('right');
	}

	public function bottom()
	{
		$this->load->view('bottom');
	}
}

?>
